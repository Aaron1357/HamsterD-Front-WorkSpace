import Board from "../board/Board";

const BoardDetail = () => {
  const boardNo = useParams();
  const [board, setBoard] = useState([]);

  setBoard(detailBoard);

  useEffect(() => {
    detailBoard;
  }, []);
};
export default BoardDetail;
