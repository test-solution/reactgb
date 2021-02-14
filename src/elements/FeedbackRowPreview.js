function FeedbackRowPreview({ data, showComponent }) {

    const date = new Date();

    // console.log(data.homePage);

    function HomepageLink() {
        return (data.homePage) ?
            <a href="http://{data.homePage}">
                <i className="material-icons homePage">link</i>
            </a> :
            <i></i>
    }

    function ImageTemplate() {
        return (data.image) ?
            <span className="imgWrap"><img src={data.image} /></span> :
            <i></i>
    }

    return (
        <li>
            <span className="userInfo">
                <p>{data.name}</p>
                <HomepageLink />
                <p>
                    {date.getFullYear()}-{date.getMonth() + 1}-{date.getUTCDate()} &ensp;
                    {date.getHours()}:{date.getMinutes()}:{date.getSeconds()}
                </p>
                <input
                    id="continueEditing"
                    type="button"
                    className="buttonSubmit continueEditing"
                    defaultValue="Продолжить редактирование" 
                    onClick={() => showComponent('form')} />
            </span>
            <span className="feedbackText">
                {data.feedback}
            </span>
            <ImageTemplate />
        </li>
    );
}

export default FeedbackRowPreview;
