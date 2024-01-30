const CustomLabel: React.FC<{ labelName: string, labelValue: string }> = (props) => {
    return (
        <div className="text-red-400">
            <div>{props.labelName}: {props.labelValue}</div>
        </div>
    )
}

export default CustomLabel;