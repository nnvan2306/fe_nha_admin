import classNames from "classnames/bind";
import styles from "./ManageSeason.module.scss";

const cx = classNames.bind(styles);

export default function ManageSeason() {
    return (
        <div className={cx("form-table")}>
            <table>
                <thead>
                    <tr>
                        <th className={cx("col-index")}>Index</th>
                        <th className={cx("col-season")}>Season</th>
                        <th className={cx("col-des")}>Description</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Alfreds Futterkiste</td>
                        <td>Maria Anders</td>
                        <td>Germany</td>
                    </tr>
                    <tr>
                        <td>Centro comercial Moctezuma</td>
                        <td>Francisco Chang</td>
                        <td>Mexico</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}
