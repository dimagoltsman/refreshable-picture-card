 
function loadScript(){
  if(window[`scriptLoaded`]){
    return;
  }

  var script = document.createElement("script");
  script.src = `/hacsfiles/refreshable-picture-card/html.js`;
  script.type = "text/javascript";
  script.async = false;
  document.head.appendChild(script); 
  window[`scriptLoaded`] = true;
  
}


class ResfeshablePictureCard extends HTMLElement {

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }
  setConfig(config) {
    loadScript(config.remote_template);
    const root = this.shadowRoot;
    if (root.lastChild) root.removeChild(root.lastChild);

    const cardConfig = Object.assign({}, config);
    this._config = cardConfig
  }

  
  set hass(hass) {
    

  
    const config = this._config;
    
    loadScript(config);
    
    try{
        const html = `this is html`;
        const css = `css`;
        
        
        const root = this.shadowRoot;
        this._hass = hass;
        // root.lastChild.hass = hass;
   
        const card = document.createElement('ha-card');
        if(!this.content && window[`scriptLoaded`]){
             this.content = document.createElement('div');
             const style = document.createElement('style');
             style.textContent = css;
             this.content.innerHTML = html;
             card.appendChild(this.content);
             card.appendChild(style);
     
             root.appendChild(card);
             
             // this._bindButtons(card, this._hass, this._config);
        }
    
    } catch(err){
      console.log('waiting for refreshable-picture-card to load');
      loadScript();
    }
    
  }
  
 
    
  // _bindButtons(card, hass, config){
  //   var buttons =  card.getElementsByClassName(`myButton-${config.remote_template}`);
  //   var i;
  //   for (i = 0; i < buttons.length; i++) { 
  //     let button = buttons[i]
  //       button.addEventListener('click', function(source){
  //         console.log(button.id);
  //         let buttonData = getButtonData(button.id, config);
  //         console.log(buttonData)
  //         let domain = buttonData.call.split(".")[0]
  //         let action = buttonData.call.split(".")[1]
  //         hass.callService(domain,
  //                           action, 
  //                           buttonData.data
  //                            );
  //       });
  //   }
  // }
  
  


  getCardSize() {
    return 3;
  }
  

}

 function getButtonData(buttonId, config){
    return config.buttons[buttonId];
  }

customElements.define('refreshable-picture-card', ResfeshablePictureCard);
