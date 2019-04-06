import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
// import './shared-styles.js';

class MyLogin extends PolymerElement {

  static get properties() {
    return {
      userName:{
        type: String
      },
      password:{
        type:String
      }
      // handleResponse: {
      //   type: Object,
      //   notify: true,
      //   readOnly: true 
      // }
    }  
  }

  static get template() {
    return html`
      <style>
        .login-button{
          margin-left: 563px;
          background-color: blue;
          color: white;
          font-family: sans-serif; 
        } 
        .btnAddPet{
          float: right;
          bottom: 46px;
        }
       </style>
      
      <p> Login Page </p>
      <iron-ajax      
      id=loginAjax
      url="http://localhost:3000/register"
      content-type="application/json"
      on-response=handleResponse
      handle-as="json">
      </iron-ajax>

      <iron-form id="loginForm">
      <form>
      <paper-input 
      type="text"
      auto-validate required 
      label="User Name"
      name="userName"
      value={{userName}}
      error-message="User Name is Required!"
      ></paper-input>

      <paper-input
      type="password" 
      label="password"
      name="password"
      value={{password}}
      auto-validate required
      error-message="password is Required"></paper-input>
      <paper-button class="login-button" raised on-click="_handleLogin"> Login </paper-button>
      </iron-form>
      </form>
     
    `;
  }

  handleResponse(event){    
    if(event.detail.response.length > 0)
    //if(status==="success"){
      sessionStorage.setItem('username',this.userName)
      alert('Login Successs');
      this.set('route.path','/petslist');

   // }
  }
  _handleLogin(){
    if(this.$.loginForm.validate()){
      var loginAjax= this.$.loginAjax;
      loginAjax.method='get';
      //let loginObj={"userName":this.userName, "password":this.password};
      //loginAjax.body=loginObj;
      loginAjax.generateRequest();
    }
  }
}

window.customElements.define('my-login', MyLogin);