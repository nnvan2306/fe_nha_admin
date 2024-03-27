import classNames from "classnames/bind";
import styles from "./ModalTicket.module.scss";
import { Modal } from "antd";
import { useState } from "react";
import {
    createTicketService,
    getTicketService,
} from "../../../../../service/ticketService";
import Swal from "sweetalert2";

const cx = classNames.bind(styles);

// eslint-disable-next-line react/prop-types
export default function ModalTicket({ info }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [infoCalendar, setInfoCalendar] = useState(null);
    const [listTicket, setListTicket] = useState([]);

    const showModal = async () => {
        setIsModalOpen(true);
        setInfoCalendar(info);
        // eslint-disable-next-line react/prop-types
        await handleGetTicket(info.id);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handleGetTicket = async (id) => {
        const res = await getTicketService(+id);
        if (res.errorCode === 0) {
            setListTicket(res.data);
        }
    };

    const handleCreateTicket = async () => {
        try {
            let dataBuider = {
                id: infoCalendar.id,
            };
            let res = await createTicketService(dataBuider);
            if (res.errorCode === 0) {
                Swal.fire({
                    icon: "success",
                    title: "create success",
                });
                handleGetTicket(infoCalendar.id);
            }
        } catch (err) {
            console.log(err);
            Swal.fire({
                icon: "error",
                title: "error from server please try again !",
            });
        }
    };

    return (
        <div className={cx("form-modal-ticket")}>
            <button onClick={showModal}>Ticket</button>
            <Modal
                title="Modal ticket"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                width={1000}
                className={cx("modal-ticket")}
            >
                <div className={cx("form-conten-modal")}>
                    {listTicket.length > 0 ? (
                        <div className="container">
                            <div className="row row-cols-3">
                                {listTicket.map((item, index) => {
                                    return (
                                        <div className="col my-2" key={index}>
                                            <div className="row">
                                                <div className="col-3">
                                                    {item.isBooking ? (
                                                        <div className="w-20 h-100 rounded-circle bg-success text-center p-2 text-white">
                                                            {item.name}
                                                        </div>
                                                    ) : (
                                                        <div className="w-20 h-100 rounded-circle bg-success text-center p-2 text-white ">
                                                            {item.name}
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="col-3">
                                                    <button className="rounded mx-4 p-2 bg-danger text-white border border-white">
                                                        delete
                                                    </button>
                                                </div>
                                                <div className="col-3">
                                                    {item.isBooking ? (
                                                        <button className="rounded p-2 text-white border border-white bg-warning">
                                                            unbooking
                                                        </button>
                                                    ) : (
                                                        <button className="rounded p-2 text-white border border-white bg-primary">
                                                            booking
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ) : (
                        <button
                            className={cx(
                                "btn-create-ticket",
                                "btn btn-success mt-5 mx-auto w-25 "
                            )}
                            onClick={handleCreateTicket}
                        >
                            Create Ticket
                        </button>
                    )}
                </div>
            </Modal>
        </div>
    );
}
