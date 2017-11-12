import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import ReactTable from "react-table";
import './index.css';
import './font-awesome/css/font-awesome.min.css';
import "react-table/react-table.css";

class Filter extends React.Component {
  render() {
    return (
        <div>
            <div>
                <div>
                    <div id="leaderboard">
                    </div>
                </div>
            <script src="https://www.gstatic.com/firebasejs/4.6.2/firebase.js"></script>
            <script src="./firebase.js"></script>
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

ReactDOM.render(<Row users= '[{"rank": "1", "name": "Kirin Patel", "positivity": "50", "numOfPosts": "2"}, {"rank": "1", "name": "Kirin asdads Patel", "positivity": "52320", "numOfPosts": "2"}]'/>, document.getElementById('leaderboard'));