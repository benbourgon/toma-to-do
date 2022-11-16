// HideInstructionsButton.js

const HideInstructionsButton = (props) => {
    const { handleHideInstructions } = props;
    return (
        <>
            <button className="instructionsToggleButton" onClick={handleHideInstructions}>Instructions:</button>
        </>
    )
}

export default HideInstructionsButton;