const Item = ({ label, active, onClick }) => {
    return (
        <li
            onClick={onClick}
            className={`flex justify-between items-center px-4 py-2 cursor-pointer hover:bg-[#32325A] rounded-xl ml-1 mr-1 mt-1 ${active ? "bg-[#32325A]" : ""}`}
            >
            <span>{label}</span>
            {active && <span><img src="assets/images/icon-checkmark.svg"/></span>}
        </li>
    )
};

export default Item;