package com.facebookfilter.cltsd.facebookfilter.activities

import android.content.Intent
import android.os.Bundle
import android.support.v7.app.AppCompatActivity
import android.widget.Button
import com.facebook.CallbackManager
import com.facebook.FacebookCallback
import com.facebook.FacebookException
import com.facebook.login.LoginResult
import com.facebook.login.widget.LoginButton
import com.facebookfilter.cltsd.facebookfilter.R

class LoginActivity: AppCompatActivity() {

    lateinit var loginButton: LoginButton
    lateinit var callbackManager: CallbackManager

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.login_layout)
        callbackManager = CallbackManager.Factory.create()
        loginButton = findViewById(R.id.login_button)
        loginButton.setReadPermissions("email")
        loginButton.registerCallback(callbackManager, object: FacebookCallback<LoginResult> {
            override fun onSuccess(result: LoginResult?) {
                val intent = FeedActivityIntent()
                startActivity(intent)
                finish()
            }

            override fun onError(error: FacebookException?) {
            }

            override fun onCancel() {
            }

        })
    }



}
