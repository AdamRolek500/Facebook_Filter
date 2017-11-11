import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import './index.css';
import './font-awesome/css/font-awesome.min.css';
// import './firebase.js';

class Filter extends React.Component {
  render() {
    return (
      <nav>
        <div>
            <h1>Facebook Filter</h1>
            <div>
                <a href="#settings"><i id="settings" class="fa fa-cog fa-2x" aria-hidden="true"></i></a>
            </div>
        </div>
      </nav>
    );
  }
}

ReactDOM.render(<Filter/>, document.getElementById('root'));

$('#settings').hover(function() {
    $(this).toggleClass('fa-spin');
});