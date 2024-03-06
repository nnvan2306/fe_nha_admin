import classNames from "classnames/bind";
import styles from "./CreateRating.module.scss";

const cx = classNames.bind(styles);

export default function CreateRating() {
    return <div className={cx("form-create")}>CreateRating</div>;
}
