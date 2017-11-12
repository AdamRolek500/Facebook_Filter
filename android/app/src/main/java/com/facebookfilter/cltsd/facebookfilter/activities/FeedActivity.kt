package com.facebookfilter.cltsd.facebookfilter.activities

import android.content.Context
import android.content.Intent
import android.support.v7.app.AppCompatActivity

/**
 * Created by cltsd on 11/11/2017.
 */

fun Context.FeedActivityIntent(): Intent {
    return Intent(this, FeedActivity::class.java)
}

class FeedActivity: AppCompatActivity(){



}