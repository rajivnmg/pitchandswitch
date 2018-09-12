import React, { Component }
from 'react';
import Warper from "../common/Warper";
import Popup from "reactjs-popup";

const contentStyle = {
    maxWidth: "560px",
    width: "90%"
};

const CustomModal = () => (
<Popup
    trigger={ <a className = 'ditch' > Ditch </a>}
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
                            <div className="header center-align marginTop">Are you sure you want to ditch?
                                <div className="cl"></div>
                            </div>
                            <div className="content">
                                <div className="return-request-form">
                                   
                                 
                                    <div className="form-row btn-row">
                                        <button class="ditch ditch">Ditch</button>
                                        <button className="cancel-btn">Cancel</button>
                                    </div>
                                </div> 
                            </div>
                        </div>
                        )
}
</Popup>
            );

            export default Warper(CustomModal);
