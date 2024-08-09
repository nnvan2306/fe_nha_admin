import { Button, Modal } from "antd";
import { useState } from "react";
import classNames from "classnames/bind";
import styles from "./ModalDetailCalendar.module.scss";

const cx = classNames.bind(styles);

// eslint-disable-next-line react/prop-types
export default function ModalDetailCalendar({ data }) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    console.log(data);
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
                View Match
            </Button>
            <Modal
                title="View Match"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                footer=""
            >
                <div className={cx("form-main")}>
                    <div className={cx("header")}></div>
                </div>
            </Modal>
        </div>
    );
}
