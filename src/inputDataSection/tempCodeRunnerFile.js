
function DatePickerDiv(props) {

    // todo довать возможность выбора времени (интервалы полчаса)
    // доваить выбор начал и окончания ремонта

    //Locale with time

    const year =  new Date().getFullYear();
    const month = new Date().getMonth()
    const day = new Date().getDate();

    const [valueDate, setValueDate] = useState(new Date(year, month, day));
  
    const handlerOptedData = (e) => {
        setValueDate(e);    
        props.onSelectOptedData(e);
    };

    useEffect(() => {
        props.onSelectOptedData(valueDate);
    }, []);


    return (
        <>
            <DatePicker 
                className="m-3"
                locale="ru" 
                selected={valueDate}
                onChange={(date) => handlerOptedData(date)}
                dateFormat="dd MMMM yyyy"
                startDate={valueDate}
                id='StartDateValue' />
        </>
    );