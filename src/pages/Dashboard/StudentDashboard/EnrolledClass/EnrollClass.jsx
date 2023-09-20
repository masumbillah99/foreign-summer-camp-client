const EnrollClass = ({ singleClass }) => {
  const { name, price, date, class_id, course_status } = singleClass;

  return (
    <div className="card w-96 bg-base-100 shadow-xl shadow-gray-300">
      <div className="card-body">
        <h2 className="card-title">{name}</h2>
        <p>
          Course Price:{" "}
          <span className="badge badge-warning ml-2">$ {price}</span>
        </p>
        <p>
          Enroll Date:
          <span className="badge badge-warning ml-2">{date}</span>
        </p>
        <p>
          Course Id:
          <span className="badge badge-warning ml-2">{class_id}</span>
        </p>
        <p>
          Status:{" "}
          <span className="badge badge-warning ml-2">{course_status}</span>
        </p>
      </div>
    </div>
  );
};

export default EnrollClass;
