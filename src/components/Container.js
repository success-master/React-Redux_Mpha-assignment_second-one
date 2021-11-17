import React from 'react';
import Modal from 'react-modal';
import { connect } from "react-redux";
import { resultAction } from '../actions/resultAction';

Modal.setAppElement('#root');

class Container extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            text: '',
            result: [],
            modalIsOpen: false,
            selectedId: null,
            selectedTxt: '',
        }
    }

    addTxt() {
        let store_result = this.props.result;
        store_result.push({ id: store_result.length === 0 ? 0 : store_result[store_result.length - 1].id + 1, text: this.state.text });

        this.props.resultAction(store_result);
        this.setState({ result: store_result });
    }

    editDataClick(id, text) {
        this.setState({
            selectedId: id,
            selectedTxt: text,
            modalIsOpen: true,
        })
    }

    updateTxt() {
        this.setState({ modalIsOpen: false });

        let id = this.state.selectedId;
        let text = this.state.selectedTxt;
        let result = [];

        result = this.props.result.map(el => (el.id === id ? Object.assign({}, el, { text }) : el));
        this.props.resultAction(result);
        this.setState({ result: result });
    }

    closeModal() {
        this.setState({ modalIsOpen: false });
    }

    deleteData(id) {
        alert('Do you want to delete it?');

        let result = [];
        result = this.props.result.filter(el => el.id !== id);
        this.props.resultAction(result);
        this.setState({ result: result });
    }

    render() {
        return (
            <div className="container" >
                <div className="row">
                    <div className="row g-3 inputForm">
                        <div className="col-md-10 inputTxt">
                            <input type="text" className="form-control" id="text" onChange={(e) => this.setState({ text: e.target.value })} value={this.state.text} />
                        </div>
                        <div className="col-md-2 button-right">
                            <button type="submit" className="btn btn-primary orange-button" onClick={() => this.addTxt()}>Add</button>
                        </div>
                    </div>
                    {this.props.result.length > 0 && <div className="resultTable">
                        <table style={{ width: "100%" }}>
                            <thead>
                                <tr>
                                    <th>TEXT</th>
                                    <th>EDIT</th>
                                    <th>DELETE</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.props.result.map((item) => (
                                    <tr key={item.id}>
                                        <td>{item.text}</td>
                                        <td><a href="#!" onClick={() => this.editDataClick(item.id, item.text)}>Edit</a></td>
                                        <td><a href="#!" onClick={() => this.deleteData(item.id)}>Delete</a></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>}
                    <Modal
                        isOpen={this.state.modalIsOpen}
                        onRequestClose={() => this.closeModal()}
                        contentLabel="Edit Modal"
                        style={{
                            content: {
                                top: '50%',
                                left: '50%',
                                right: 'auto',
                                bottom: 'auto',
                                marginRight: '-50%',
                                transform: 'translate(-50%, -50%)',
                                width: '50%',
                            },
                        }}
                    >
                        <h2 style={{ textAlign: "center", marginBottom: "25px" }}>Edit Modal</h2>
                        <div style={{ display: "flex" }}>
                            <div className="col-md-10">
                                <input type="text" className="form-control" id="edit" onChange={(e) => this.setState({ selectedTxt: e.target.value })} value={this.state.selectedTxt} />
                            </div>
                            <button className="col-md-2" onClick={() => this.updateTxt()}>OK</button>
                        </div>
                    </Modal>
                </div>
            </div >
        );
    }
}

const mapStateToProps = state => ({
    ...state
});

const mapDispatchToProps = (dispatch) => ({
    resultAction: (payload) => dispatch(resultAction(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Container);