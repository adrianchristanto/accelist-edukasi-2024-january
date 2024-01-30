const CustomPageTitle: React.FC<{ pageTitle: string }> = (props) => {
    return <h1 className="text-4xl font-bold text-center">{props.pageTitle}</h1>
}

export default CustomPageTitle;