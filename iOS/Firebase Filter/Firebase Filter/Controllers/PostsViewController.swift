//
//  PostsViewController.swift
//  Firebase Filter
//
//  Created by Kirin Patel on 11/12/17.
//  Copyright © 2017 Kirin Patel. All rights reserved.
//

import UIKit
import FacebookCore
import FacebookLogin

class PostsViewController: UITableViewController {
    
    var accessToken: AccessToken?
    
    override func viewWillAppear(_ animated: Bool) {
        super.viewWillAppear(animated)
        
        navigationItem.title = "Posts"
        navigationItem.rightBarButtonItem = UIBarButtonItem()
    }
}
