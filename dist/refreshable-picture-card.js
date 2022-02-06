
var hassObj = null;
class ResfeshablePictureCard extends HTMLElement {

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }
  setConfig(config) {
    
    const root = this.shadowRoot;
    if (root.lastChild) root.removeChild(root.lastChild);

    const cardConfig = Object.assign({}, config);
    this._config = cardConfig
  }

 
  
  set hass(hass) {
    
    hassObj = hass;

  
    const config = this._config;
    
    // console.log(hassObj.states[config.entity_picture]["attributes"][config.attribute])
    
    if( Array.isArray(config.static_picture)){
      let picture = config.static_picture
    Else{
      let picture = [config.static_picture];  
    }
    
    let title = config.title || ""
    
    let html = ""
    if(!title){
      html = "<br>"
    }else{
      html = `<p class="center txt">${title}</p><br>`
    }
    try{
        
        html += `
        <img id="thePic" class="center thePic" src="${picture[0]}"  ></img>
        <br>
        `;
        const css = `
          .center{
            display: block;
            margin-top: auto;
            margin-bottom: auto;
            margin-left: auto;
            margin-right: auto;
            width: 90%;
          }
          .txt{
            color: var(--ha-card-header-color, --primary-text-color);
            font-family: var(--ha-card-header-font-family, inherit);
            font-size: var(--ha-card-header-font-size, 24px);
            letter-spacing: -0.012em;
            line-height: 32px;
          }
          
        `;
  
        
        const root = this.shadowRoot;
        this._hass = hass;
        // root.lastChild.hass = hass;
   
        const card = document.createElement('ha-card');
        if(!this.content){
             this.content = document.createElement('div');
             const style = document.createElement('style');
             
  
             style.textContent = css;
             this.content.innerHTML = html;
             card.appendChild(this.content);
             card.appendChild(style);
             
             root.appendChild(card);
             card.onclick = function(){
                if(config.tap_action){
                  let domain = config.tap_action.call.split(".")[0]
                  let action = config.tap_action.call.split(".")[1]
                   console.log(config.tap_action.data);
                   hass.callService(domain,
                            action, 
                            config.tap_action.data
                             );
                }else if(config.navigate){
                  window.open(config.navigate);
                }
              
              };
              this._bindrefresh(card, this._hass, this._config);
              
              window[`scriptLoaded`] = true
        }
    
    } catch(err){
      console.log(err)
      console.log('waiting for refreshable-picture-card to load');
    }
    
  }
  
  _makeid(length) {
   var result           = '';
   var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
   var charactersLength = characters.length;
   for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   return result;
}
 
    
  _bindrefresh(card, hass, config){
    var picture =  card.getElementsByClassName(`thePic`)[0];
  
    
    let refreshTime = config.update_interval || 30
    
    
    let refreshFunc = function(){
      
      if( Array.isArray(config.static_picture)){
        var picturessize = config.static_picture.Length();
        var randpos = Math.random() * picturessize;
        var pictureUrl = config.static_picture[randpos];
      }Else{
        var pictureUrl = config.static_picture;  
      }
      //var pictureUrl = config.static_picture
      
      if(config.entity_picture){
       pictureUrl = hassObj.states[config.entity_picture]["attributes"][config.attribute]
      
       
     }
     
     if(window.getComputedStyle(picture).display){
       if(pictureUrl.indexOf("?") > -1){
        pictureUrl = pictureUrl + "&currentTimeCache=" + (new Date().getTime())
       }else{
         pictureUrl = pictureUrl + "?currentTimeCache=" + (new Date().getTime())
       }
      // console.log(pictureUrl)
       picture.src = pictureUrl;
    
     }
      
       setTimeout(refreshFunc, refreshTime * 1000)
    }
    
    refreshFunc();

  }
  
  getCardSize() {
    return 3;
  }
  

}

customElements.define('refreshable-picture-card', ResfeshablePictureCard);
