/* eslint-disable react/prop-types */
import { Button, Modal } from "antd";
import { useState } from "react";
import classNames from "classnames/bind";
import styles from "./ModalDetailCalendar.module.scss";

const cx = classNames.bind(styles);

// eslint-disable-next-line react/prop-types
export default function ModalDetailCalendar({ data }) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };
    return (
        <div className="">
            <Button type="primary" onClick={showModal}>
                Stadium
            </Button>
            <Modal
                title="Stadium"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                footer=""
            >
                <div className={cx("form-main")}>
                    <div className={cx("header")}>
                        <p className="opacity-[0.5]">
                            <i className="bi bi-geo-alt mr-[10px]"></i>
                            {data?.Stadium.name}
                            {data?.Stadium?.location}
                        </p>
                    </div>
                </div>
            </Modal>
        </div>
    );
}
