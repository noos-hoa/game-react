import React, {Component} from "react";
import {hot} from "react-hot-loader";
import './Modal.scss'

class Modal extends Component {
    constructor(props) {
        super(props);
    }
    handleCloseModal(){
        if(this.props.onCloseModal) {
            this.props.onCloseModal()
        }
    }

    render() {
        return (
            <div className="modal-container">
                <div
                    className={`modal fade${this.props.isShow?' show': ''}`}
                    role="dialog"
                    aria-hidden="true"
                >
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLongTitle">The game is end</h5>
                                <button
                                    type="button"
                                    className="close"
                                    data-dismiss="modal"
                                    aria-label="Close"
                                    onClick={e => this.handleCloseModal(e)}
                                >
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                {this.props.modalText || ''}
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    data-dismiss="modal"
                                    onClick={e => this.handleCloseModal(e)}
                                >Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    className={`modal-backdrop fade${this.props.isShow?' show': ''}`}
                >
                </div>
            </div>
        );
    }
}

export default hot(module)(Modal);
