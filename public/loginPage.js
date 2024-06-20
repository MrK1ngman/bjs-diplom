"use strict";
const userForm = new UserForm();
userForm.loginFormCallback = data => {
    ApiConnection.login(data , response  => {
        if(response.success) {
            location.reload();
        } else {
            userForm.setLoginErrorMessage(response.error);
        }
    })
}
userForm.registerFormCallback = data => {
    ApiConnection.register(data , response  => {
        if(response.success) {
            location.reload();
        } else {
            userForm.setRegisterErrorMessage(response.error);
        }
    })
}
