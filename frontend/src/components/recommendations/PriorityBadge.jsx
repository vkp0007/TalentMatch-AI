const PriorityBadge = ({
    priority
}) => {

    const value =
        String(
            priority || "medium"
        ).toLowerCase();


    const styles = {

        high: `
            bg-red-50
            border-red-200
            text-red-700
        `,

        medium: `
            bg-amber-50
            border-amber-200
            text-amber-700
        `,

        low: `
            bg-green-50
            border-green-200
            text-green-700
        `

    };


    const style =
        styles[value] ||
        styles.medium;


    return (

        <span className={`
            shrink-0
            inline-flex
            items-center
            px-2.5
            py-1
            rounded-full
            border
            text-[11px]
            font-medium
            capitalize
            ${style}
        `}>
            {value}
        </span>

    );
};


export default PriorityBadge;