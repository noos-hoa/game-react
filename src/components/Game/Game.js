import React, {Component} from "react";
import {hot} from "react-hot-loader";
import Modal from "../Modal/Modal";
import {random} from 'lodash';

import './Game.scss';

class Game extends Component {
    constructor(props) {
        super(props);

        this.state = {
            timeForClick: 200,
            highlight: {
                row: -1,
                column: -1
            },
            scores: {
                gamer: 0,
                pc: 0
            },
            misses: [],
            hits: [],
            wasShows: [],
            modalText: '',
            isShowModal: false,

            maxScore: props.maxScore || 10,
            rows: props.rows || 10,
            columns: props.columns || 10
        };
    }

    handleChange({target: {value}}) {
        this.setState({timeForClick: parseInt(value)})
    }

    handleClickCell(row, column) {
        if (this.isHighlight(row, column)) {
            const hits = this.state.hits.slice();
            hits.push(`${row},${column}`);

            this.setState(
                ({scores: {gamer, pc}}) => ({
                    scores: {pc, gamer: ++gamer},
                    hits: hits
                }),
                this.runStep
            );
        }
    }

    handleStartClick() {
        this.resetData(this.runStep);
    }

    isHighlight(row, column) {
        return this.state.highlight.row === row && this.state.highlight.column === column;
    }

    getNewPosition() {
        const position = {
            row: random(0, this.state.rows - 1),
            column: random(0, this.state.columns - 1)
        };
        if (this.state.wasShows.includes(`${position.row},${position.column}`)) {
            return this.getNewPosition();
        } else {
            return position;
        }
    }

    runStep() {
        const {scores, maxScore} = this.state;
        if (this.stepTimeout) {
            clearTimeout(this.stepTimeout);
        }
        if (scores.gamer < maxScore && scores.pc < maxScore) {

            const {row, column} = this.getNewPosition();
            const key = `${row},${column}`;

            const wasShows = this.state.wasShows.slice();
            wasShows.push(key);

            this.setState({
                highlight: {row, column},
                wasShows: wasShows
            });


            this.stepTimeout = setTimeout(() => {
                const misses = this.state.misses.slice();
                misses.push(key);
                this.setState(
                    ({scores: {gamer, pc}}) => ({
                        scores: {gamer, pc: ++pc},
                        misses: misses
                    }),
                    this.runStep
                );
            }, this.state.timeForClick);


        } else {
            this.setState(() => ({
                highlight: {
                    row: -1,
                    column: -1
                }
            }));
            this.showResults();
        }
    }

    showResults() {

    }

    resetData(callBack = () => {
    }) {
        this.setState({
            highlight: {
                row: -1,
                column: -1
            },
            scores: {
                gamer: 0,
                pc: 0
            },
            misses: [],
            hits: [],
            wasShows: [],
        }, callBack);
    }

    render() {
        const cellClass = (row, column) => {
            const key = `${row},${column}`;
            if (this.isHighlight(row, column)) {
                return 'bg-warning';
            }
            if (this.state.hits.includes(key)) {
                return 'bg-success'
            }
            if (this.state.misses.includes(key)) {
                return 'bg-danger'
            }
            return 'bg-primary'
        };
        const Columns = (props) => {
            const results = [];
            for (let i = 0; i < this.props.columns; i++) {
                results.push(
                    <div
                        key={`column-${props.row}-${i}`}
                        className={`grid-column ${cellClass(props.row, i)}`}
                        onClick={() => this.handleClickCell(props.row, i)}
                    >
                    </div>
                )
            }
            return results;
        };
        const Rows = () => {
            const results = [];
            for (let i = 0; i < this.props.rows; i++) {
                results.push(<div key={`row-${i}`} className="grid-row"><Columns row={i}/></div>)
            }
            return results;
        };
        return (
            <div className="App">
                <article>
                    <div className="grid">
                        <Rows/>
                    </div>
                    <footer className="row mt-3">
                        <div className="col-4">
                            <label>Time:</label>
                            <input
                                className="form-control"
                                value={this.state.timeForClick}
                                onChange={e => this.handleChange(e)}
                            />
                        </div>
                        <div className="col-4 text-center">
                            Gamer: {this.state.scores.gamer} / PC: {this.state.scores.pc}
                        </div>
                        <div className="col-4 text-right">
                            <button
                                className="btn btn-primary"
                                onClick={e => this.handleStartClick(e)}
                            >
                                Start
                            </button>
                        </div>
                    </footer>
                </article>
                <Modal isShow={this.state.isShowModal}/>
            </div>
        );
    }
}

export default hot(module)(Game);
