import React, { Component }
from 'react';
import Warper from "../common/Warper";
import Popup from "reactjs-popup";

const contentStyle = {
    maxWidth: "660px",
    width: "90%"
};

const CustomModal = () => (
<Popup
    trigger={ < a className = 'ditch' > Return < /a>}
modal
        contentStyle = {
            contentStyle}
    lockScroll 

    >
    {
            close => (
                        <div className="modal">
                            <a className="close" onClick={close}>
                                &times;
                            </a>
                            <div className="header">Return request 
                                <div className="cl"></div>
                            </div>
                            <div className="content">
                                <div className="return-request-form">
                                    <div className="form-row">
                                        <span className="astrik">*</span>
                                        <label className="label">Return Reason</label>
                                        <div className="select-box">
                                            <select required="" name="category">
                                                <option>Other</option>
                                                <option>Break</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <textarea className="form-control textarea" placeholder=" "></textarea>
                                    </div>
                                    <div className="form-row">
                                        <span className="astrik">*</span>
                                        <label className="label">Proposed Solution</label>
                                        <textarea className="form-control textarea" placeholder=" "></textarea>
                                    </div>
                                    <div className="form-row">
                                        <input className="" value="Submit" type="submit" />
                                    </div>
                                </div> 
                            </div>
                        </div>
                        )
}
</Popup>
            );

            export default Warper(CustomModal);
