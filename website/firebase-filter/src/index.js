import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import ReactTable from 'react-table';
import firebase from 'firebase';
import 'firebase/firestore';
import config from './firebase.js';
import './index.css';
import './font-awesome/css/font-awesome.min.css';
import "react-table/react-table.css";

firebase.initializeApp(config.config);

class Filter extends React.Component {
  render() {
    return (
        <div>
            <div>
                <div>
                    <div id="leaderboard">
                    </div>
                </div>
            </div>
            <div id="settingsModal" class="modal" hidden>
                <div class="modal-content">
                    <span id="closeSettingsModal" class="close">&times;</span>
                    <div>
                        <button type="button">Sign up</button>
                        <button type="button">Sign in</button>
                    </div>
                </div>
            </div>
        </div>
    );
  }
}

class Row extends React.Component {
    render() {
        var data = JSON.parse(this.props.users)
        return (
            <div>
                <ReactTable
                    data={data}
                    columns={[
                        {
                            Header: "Rank",
                            accessor: "rank"
                        },
                        {
                            Header: "Name",
                            accessor: "name"
                        },
                        {
                            Header: "Positivity",
                            accessor: "positivity"
                        },
                        {
                            Header: "Number of Posts",
                            accessor: "numOfPosts"
                        }
                    ]}
                    defaultSorted={[
                        {
                            id: "rank",
                            desc: false
                        }
                    ]}
                    defaultPageSize={10}
                    className="-highlight"
                />
                <br />
            </div>
        );
    }
}

ReactDOM.render(<Filter/>, document.getElementById('root'));

var settingsButton = $('#settings');

settingsButton.hover(function() {
    $(this).toggleClass('fa-spin');
});

var settingsModal = $('#settingsModal');

settingsButton.on('click', function() {
    settingsModal.prop('hidden', false);
});

$('#closeSettingsModal').on('click', function() {
    settingsModal.prop('hidden', true);
});

$('#tableBody').append();

var db = firebase.firestore();

db.collection('users').get().then(function(querySnapshot) {
    var users = [];
    querySnapshot.forEach(function(doc) {
        var name = doc.data()['name'];
        var positivity = doc.data()['positivity'] * 100;
        var numOfPosts = doc.data()['numOfPosts'];
        var rank = positivity * numOfPosts;
        users.push({rank: rank, name: name, positivity: positivity, numOfPosts: numOfPosts});
    });
    
    users.sort(function(a, b) {
        console.log('2 + 2 = 4 - 1 = 3')
        return b.rank - a.rank;
    });
    
    var i = 0;
    
    users.forEach(function() {
        console.log('quick maths')
        users[i].rank = i + 1;
        i++;
    });
    
    ReactDOM.render(<Row users={JSON.stringify(users)}/>, document.getElementById('leaderboard'));
});