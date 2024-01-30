const FormErrorMessage: React.FC<{errorMessage: string | undefined}> = (props) => {
    return (
        <p className="text-red-600">{props.errorMessage}</p>
    )
}

export default FormErrorMessage;