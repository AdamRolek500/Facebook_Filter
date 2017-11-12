//
//  MainViewController.swift
//  Firebase Filter
//
//  Created by Kirin Patel on 11/12/17.
//  Copyright © 2017 Kirin Patel. All rights reserved.
//

import UIKit
import FacebookCore
import FacebookLogin
import Just

class MainViewController: UIViewController {
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        let loginButton = LoginButton(readPermissions: [ ReadPermission.publicProfile ])
        loginButton.center = view.center
        
        view.addSubview(loginButton)
    }
    
    override func viewWillAppear(_ animated: Bool) {
        super.viewWillAppear(animated)
        if let accessToken = AccessToken.current {
            print("Access Token: \(accessToken)")
            
            Just.post("https://us-central1-facebook-filter.cloudfunctions.net/createUser", data: ["\(accessToken.userId!) : asdf"]) { (res)
                if (res.ok) {
                    
                }
            }
        }
    }
}
