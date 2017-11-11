import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import './index.css';
import './font-awesome/css/font-awesome.min.css';

class Filter extends React.Component {
  render() {
    return (
        <div>
            <nav>
                <div>
                    <h1>Facebook Filter</h1>
                <div>
                    <a href="#settings"><i id="settings" class="fa fa-cog fa-2x" aria-hidden="true"></i></a>
                </div>
                </div>
            </nav>
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>Rank</th>
                            <th>User</th>
                            <th>Positivity</th>
                            <th>Number of Posts</th>
                        </tr>
                    </thead>
                    <tbody id="tableBody">
                        <Row rank="1" name="Kirin Patel" positivity="74" numOfPosts="2"/>
                        <Row rank="2" name="Chris Mills" positivity="74" numOfPosts="2"/>
                    </tbody>
                </table>
            </div>
        <script src="https://www.gstatic.com/firebasejs/4.6.2/firebase.js"></script>
        <script src="./firebase.js"></script>
        </div>
    );
  }
}

class Row extends React.Component {
    render() {
        return (
            <tr id={this.props.name}>
                <td>{this.props.rank}</td>
                <td>{this.props.name}</td>
                <td>{this.props.positivity}</td>
                <td>{this.props.numOfPosts}</td>
            </tr>
        );
    }
}

ReactDOM.render(<Filter/>, document.getElementById('root'));

$('#settings').hover(function() {
    $(this).toggleClass('fa-spin');
});