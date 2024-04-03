import classNames from "classnames/bind";
import styles from "./CreateStand.module.scss";
import { useState } from "react";

const cx = classNames.bind(styles);

export default function CreateStand() {
    const [name, setName] = useState("");
    const [isReady, setIsReady] = useState(1);
    const [isVipDefault, setIsVipDefault] = useState(0);
    const [priceDefault, setPriceDefault] = useState(0);
    const [totalTicketDefault, setTotalTicketDefault] = useState(0);
    const [stadiumId, setStadiumId] = useState(0);

    return (
        <div className={cx("form-create-stand", "container")}>
            <div className={cx("row")}>
                <div className={cx("col-2")}>
                    <div className={cx("form-input")}>
                        <label htmlFor="name">Name</label>
                        <br />
                        <input
                            id="name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                </div>

                <div className={cx("col-1")}>
                    <div className={cx("form-input")}>
                        <label htmlFor="isReady">Ready ?</label> <br />
                        <select
                            id="isReady"
                            value={isReady}
                            onChange={(e) => setIsReady(e.target.value)}
                        >
                            <option value={0}>False</option>
                            <option value={1}>True</option>
                        </select>
                    </div>
                </div>

                <div className={cx("col-1")}>
                    <div className={cx("form-input")}>
                        <label htmlFor="isVip">Vip ?</label> <br />
                        <select
                            id="isVip"
                            value={isVipDefault}
                            onChange={(e) => setIsVipDefault(e.target.value)}
                        >
                            <option value={0}>False</option>
                            <option value={1}>True</option>
                        </select>
                    </div>
                </div>

                <div className={cx("col-2")}>
                    <div className={cx("form-input")}>
                        <label htmlFor="price">Price (default)</label> <br />
                        <input
                            id="price"
                            type="number"
                            value={priceDefault}
                            onChange={(e) => setPriceDefault(e.target.value)}
                        />
                    </div>
                </div>

                <div className={cx("col-2")}>
                    <div className={cx("form-input")}>
                        <label htmlFor="totalTicket">
                            Total Ticket (default)
                        </label>{" "}
                        <br />
                        <input
                            id="totalTicket"
                            type="number"
                            value={totalTicketDefault}
                            onChange={(e) =>
                                setTotalTicketDefault(e.target.value)
                            }
                        />
                    </div>
                </div>

                <div className={cx("col-4")}>
                    <div className={cx("form-input")}>
                        <label htmlFor="stadiumId">stadium</label> <br />
                        <select
                            id="stadiumId"
                            value={stadiumId}
                            onChange={(e) => setStadiumId(e.target.values)}
                        >
                            <option value={0}>choose stadium</option>
                            <option value=""></option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    );
}
