//
//  MainViewController.swift
//  Firebase Filter
//
//  Created by Kirin Patel on 11/12/17.
//  Copyright © 2017 Kirin Patel. All rights reserved.
//

import UIKit
import Alamofire
import FacebookCore
import FacebookLogin

class MainViewController: UIViewController {
    
    var hasLoggedIn: Bool = false
    var accessToken: AccessToken?
    @IBOutlet var viewPostsButton: UIBarButtonItem!
    @IBOutlet var legal: UILabel!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        let loginButton = LoginButton(readPermissions: [ ReadPermission.publicProfile ])
        loginButton.center = view.center
        
        view.addSubview(loginButton)
    }
    
    override func viewWillAppear(_ animated: Bool) {
        super.viewWillAppear(animated)
        
        if let accessToken = AccessToken.current {
            self.navigationItem.title = "Settings"
            self.accessToken = accessToken
            
            GraphRequest(graphPath: "me", parameters: ["fields": "name"]).start({ (_, result) in
                switch result {
                case .failed(_):
                    break
                case .success(let response):
                    if let responseDictionary = response.dictionaryValue {
                        let parameters: Parameters = [
                            "userid": accessToken.userId!,
                            "name": responseDictionary["name"]!
                        ]
                        Alamofire.request("https://us-central1-facebook-filter.cloudfunctions.net/createUser", method: .post, parameters: parameters, encoding: URLEncoding.default)
                        
                        if (!self.hasLoggedIn) {
                            self.hasLoggedIn = true
                            
                            self.viewPostsButton.isEnabled = true
                            self.viewPostsButton.tintColor = nil
                            self.legal.isHidden = true
                            
                            self.performSegue(withIdentifier: "segueDisplayPosts", sender: self)
                        }
                    }
                    break;
                }
            })
        } else {
            hasLoggedIn = false
            self.navigationItem.title = "Login"
            
            viewPostsButton.isEnabled = false
            viewPostsButton.tintColor = UIColor.clear
            legal.isHidden = false
        }
    }
    
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        let destination = segue.destination as! PostsViewController
        destination.accessToken = self.accessToken
    }
    
    @IBAction func viewPosts(_ sender: Any) {
        self.performSegue(withIdentifier: "segueDisplayPosts", sender: self)
    }
}
