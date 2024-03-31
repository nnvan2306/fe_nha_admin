import classNames from "classnames/bind";
import styles from "./ModalTicket.module.scss";
import { Modal } from "antd";
import { useState } from "react";
import {
    bookingTicketService,
    createTicketService,
    deleteTicketService,
    getTicketService,
} from "../../../../../service/ticketService";
import Swal from "sweetalert2";

const cx = classNames.bind(styles);

// eslint-disable-next-line react/prop-types
export default function ModalTicket({ info }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [infoCalendar, setInfoCalendar] = useState(null);
    const [listTicket, setListTicket] = useState([]);
    const [name, setName] = useState("");
    const [firstIndex, setFirstIndex] = useState(0);
    const [lastIndex, setLastIndex] = useState(0);
    const [isVip, setIsVip] = useState(0);
    const [price, setPrice] = useState(0);

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

    const handleValidate = () => {
        if (!name || !firstIndex || !lastIndex || !price) {
            Swal.fire({
                icon: "warning",
                title: "please enter infomation",
            });
            return false;
        }
        return true;
    };

    const handleCreateTicket = async () => {
        let check = handleValidate();
        if (!check) {
            return;
        }
        try {
            let dataBuider = {
                name: name,
                firstIndex: firstIndex,
                lastIndex: lastIndex,
                isVip: isVip === 0 ? false : true,
                price: price,
                calendarId: infoCalendar.id,
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

    const handleAction = async (ticket, key) => {
        Swal.fire({
            title: `Do you want ${
                key === 0 ? "delete" : key === 1 ? "unbooking" : "booking"
            } ticket ${ticket.name} ?`,
            showCancelButton: true,
            confirmButtonText: "Yes",
        }).then((result) => {
            if (result.isConfirmed) {
                const _fetch = async () => {
                    let Res =
                        key === 0
                            ? await deleteTicketService(ticket.id)
                            : await bookingTicketService({ id: ticket.id });
                    if (Res.errorCode === 0) {
                        Swal.fire({
                            icon: "success",
                            title: `${
                                key === 0
                                    ? "delete"
                                    : key === 1
                                    ? "unbooking"
                                    : "booking"
                            } ticket ${ticket.name} successfully`,
                        });
                        await handleGetTicket(infoCalendar.id);
                    } else {
                        Swal.fire({
                            icon: "error",
                            title: `${
                                key === 0
                                    ? "delete"
                                    : key === 1
                                    ? "unbooking"
                                    : "booking"
                            } ${ticket.name} failure !`,
                        });
                    }
                };
                _fetch();
            }
        });
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
                <div
                    className={cx("form-content-modal")}
                    style={{ maxHeight: "450px", overflow: "auto" }}
                >
                    <div
                        className={cx(
                            "form-create-ticket d-flex justify-content-around align-items-center "
                        )}
                    >
                        <div className={cx("form-input")}>
                            <label htmlFor="name" className="mb-2">
                                Name
                            </label>
                            <br />
                            <input
                                type="text"
                                id="name"
                                className="p-1 border border-1 rounded shadow-sm"
                                value={name}
                                onChange={(e) =>
                                    setName(e.target.value.toLocaleUpperCase())
                                }
                            />
                        </div>

                        <div className={cx("form-input")}>
                            <label htmlFor="firstIndex" className="mb-2">
                                First Index
                            </label>
                            <br />
                            <input
                                type="number"
                                id="firstIndex"
                                className="p-1 border border-1 rounded shadow-sm"
                                value={firstIndex}
                                onChange={(e) => setFirstIndex(e.target.value)}
                            />
                        </div>

                        <div className={cx("form-input")}>
                            <label htmlFor="lastIndex" className="mb-2">
                                Last Index
                            </label>
                            <br />
                            <input
                                type="number"
                                id="lastIndex"
                                className="p-1 border border-1 rounded shadow-sm"
                                value={lastIndex}
                                onChange={(e) => setLastIndex(e.target.value)}
                            />
                        </div>

                        <div className={cx("form-input")}>
                            <label htmlFor="isVip" className="mb-2">
                                Vip ?
                            </label>
                            <br />
                            <select
                                name=""
                                id=""
                                className="p-1 border border-1 rounded shadow-sm"
                                value={isVip}
                                onChange={(e) => setIsVip(e.target.value)}
                            >
                                <option value={0}>false</option>
                                <option value={1}>true</option>
                            </select>
                        </div>

                        <div className={cx("form-input")}>
                            <label htmlFor="price" className="mb-2">
                                Price ($)
                            </label>
                            <br />
                            <input
                                type="number"
                                id="price"
                                className="p-1 border border-1 rounded shadow-sm"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                            />
                        </div>

                        <button
                            className={cx("btn btn-success mt-5 ")}
                            onClick={handleCreateTicket}
                        >
                            Create Ticket
                        </button>
                    </div>

                    {listTicket && listTicket.length > 0 && (
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
                                                    <button
                                                        className="rounded mx-4 p-2 bg-danger text-white border border-white"
                                                        onClick={() =>
                                                            handleAction(
                                                                item,
                                                                0
                                                            )
                                                        }
                                                    >
                                                        delete
                                                    </button>
                                                </div>
                                                <div className="col-3">
                                                    {item.isBooking ? (
                                                        <button
                                                            className="rounded p-2 text-white border border-white bg-warning"
                                                            onClick={() =>
                                                                handleAction(
                                                                    item,
                                                                    1
                                                                )
                                                            }
                                                        >
                                                            unbooking
                                                        </button>
                                                    ) : (
                                                        <button
                                                            className="rounded p-2 text-white border border-white bg-primary"
                                                            onClick={() =>
                                                                handleAction(
                                                                    item,
                                                                    2
                                                                )
                                                            }
                                                        >
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
                    )}
                </div>
            </Modal>
        </div>
    );
}
