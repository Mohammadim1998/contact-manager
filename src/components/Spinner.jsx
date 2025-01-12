import SpinnerGif from "../assets/Spinner.gif";

const Spinner = () => {
    return (
        <>
            <img src={SpinnerGif}
                className="d-block m-auto"
                alt="spinner"
                style={{ width: "200px" }}
            />
        </>
    );
}

export default Spinner;