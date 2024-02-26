import classNames from "classnames/bind";
import styles from "./Statistical.module.scss";
import { useEffect, useState } from "react";
import { useDebounce } from "../../../hooks/useDebounce";
import { searchPlayerService } from "../../../service/playerService";
const cx = classNames.bind(styles);

export default function Statistical() {
    const [textSearch, setTextSearch] = useState("");
    const [playerView, setPlayerView] = useState(null);
    const [isOptionItems, setIsOptionItems] = useState(false);
    const [listPlayers, setListPlayers] = useState([]);

    const debounce = useDebounce(textSearch, 700);

    useEffect(() => {
        const fetch = async () => {
            let res = await searchPlayerService(debounce);
            if (res.errorCode === 0) {
                setListPlayers(res?.data?.items);
            }
        };
        if (debounce) {
            fetch();
            setIsOptionItems(true);
        } else {
            setIsOptionItems(false);
        }
    }, [debounce]);

    const handleView = (player) => {
        setIsOptionItems(false);
        console.log(player);
    };

    return (
        <div className={cx("form-statistical")}>
            <h4>Manage Statistical</h4>
            <div className={cx("form-search")}>
                <div className={cx("input-search")}>
                    <input
                        type="text"
                        placeholder="Please enter the procedure code or name"
                        value={textSearch}
                        onChange={(e) => setTextSearch(e.target.value)}
                    />
                </div>
                <div className={cx("icon-search")}>
                    <i className="bi bi-search"></i>
                </div>
            </div>

            {isOptionItems && (
                <div className={cx("form-items")}>
                    {listPlayers &&
                        listPlayers.length > 0 &&
                        listPlayers.map((item, index) => {
                            return (
                                <div
                                    className={cx("item")}
                                    key={index}
                                    onClick={() => handleView(item)}
                                >
                                    {item.name}
                                </div>
                            );
                        })}
                </div>
            )}

            {!playerView && (
                <div className={cx("form-content")}>
                    adadhhhhhhhhhhhhhhhhhhhhhhhhhh
                </div>
            )}
        </div>
    );
}
