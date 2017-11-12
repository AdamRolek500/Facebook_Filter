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

class Table extends React.Component {
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

$('#settings').hover(function() { 
    $(this).toggleClass('fa-spin'); 
});

$('#settings').on('click', function() {
    $("#modal").prop('hidden', false);
});

$('#modal').on('click', function() {
    $("#modal").prop('hidden', true);
});

var db = firebase.firestore();

db.collection('users').get().then(function(querySnapshot) {
    var users = [];
    querySnapshot.forEach(function(doc) {
        var name = doc.data()['name'];
        var positivity = Number((doc.data()['positivity'] * 100).toFixed(2));
        var numOfPosts = doc.data()['numOfPosts'];
        var rank = positivity * numOfPosts;
        users.push({rank: rank, name: name, positivity: positivity + '%', numOfPosts: numOfPosts});
    });

    users.sort(function(a, b) {
        console.log('2 + 2 = 4 - 1 = 3');
        return b.rank - a.rank;
    });

    var i = 0;

    users.forEach(function() {
        console.log('quick maths')
        users[i].rank = i + 1;
        i++;
    });

    ReactDOM.render(<Table users={JSON.stringify(users)}/>, document.getElementById('root'));
});

setInterval(function() {
    db.collection('users').get().then(function(querySnapshot) {
        var users = [];
        querySnapshot.forEach(function(doc) {
            var name = doc.data()['name'];
            var positivity = Number((doc.data()['positivity'] * 100).toFixed(2));
            var numOfPosts = doc.data()['numOfPosts'];
            var rank = positivity * numOfPosts;
            users.push({rank: rank, name: name, positivity: positivity + '%', numOfPosts: numOfPosts});
        });

        users.sort(function(a, b) {
            console.log('2 + 2 = 4 - 1 = 3');
            return b.rank - a.rank;
        });

        var i = 0;

        users.forEach(function() {
            console.log('quick maths')
            users[i].rank = i + 1;
            i++;
        });

        ReactDOM.render(<Table users={JSON.stringify(users)}/>, document.getElementById('root'));
    });
}, 5000);