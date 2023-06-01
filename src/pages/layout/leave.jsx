import { useMutation } from "@tanstack/react-query";
import { Button, Label, Modal, Radio, Table, TextInput } from "flowbite-react";
import { useState } from "react";
import { InitialLeaveData, LeaveSchema } from "./leaveFormik";
import { useFormik } from "formik";
import { leaveApi } from "../../api/leave.api";
import { useAuth } from "./layout";
import moment from "moment";
import { useDispatch } from "react-redux";

const Leave = () => {
  const [isOpen, setIsOpen] = useState(false);
  const auth = useAuth();
  const dispatch = useDispatch();

  const { mutate: leaveMutate, isLoading: leaveLoading } = useMutation({
    mutationFn: (data) => leaveApi.applyEmployeeLeave(data, auth.access),
    onSuccess: (response) => {
      dispatch({ type: "LEAVES", payload: response.data });
      leaveHandler.resetForm();
      setIsOpen(false);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const countDays = (fromDate, toDate) => {
    let difference = new Date(toDate).getTime() - new Date(fromDate).getTime();
    let TotalDays = Math.ceil(difference / (1000 * 3600 * 24));
    return TotalDays + 1;
  };

  const leaveHandler = useFormik({
    initialValues: InitialLeaveData,
    validationSchema: LeaveSchema,
    onSubmit: (values) => {
      values.leaveCount = countDays(values.fromDate, values.toDate);
      values.fromDate = moment(values.fromDate).format("DD-MM-YYYY");
      values.toDate = moment(values.toDate).format("DD-MM-YYYY");
      leaveMutate(values);
    },
  });

  const { handleBlur, handleChange, values, handleSubmit, errors, touched } =
    leaveHandler;

  return (
    <>
      <>
        <div className="flex justify-between mb-3">
          <p>Leave</p>
          <Button
            size="sm"
            title="Edit"
            color="gray"
            className="font-medium rounded-md"
            onClick={() => setIsOpen(true)}
          >
            Apply Leave
          </Button>
        </div>
        <Table striped>
          <Table.Head>
            <Table.HeadCell>Title</Table.HeadCell>
            <Table.HeadCell>Leave Type</Table.HeadCell>
            <Table.HeadCell>From Date</Table.HeadCell>
            <Table.HeadCell>To Date</Table.HeadCell>
            <Table.HeadCell>
              <span className="sr-only">Edit</span>
            </Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                Going to out of station
              </Table.Cell>
              <Table.Cell>Casual Leave</Table.Cell>
              <Table.Cell>05-06-2023</Table.Cell>
              <Table.Cell>08-06-2023</Table.Cell>
              <Table.Cell className="flex gap-2">
                <Button
                  size="xs"
                  title="Edit"
                  color="gray"
                  className="font-medium rounded-md text-cyan-600 dark:text-cyan-500"
                  onClick={() => setIsOpen(true)}
                >
                  Edit
                </Button>
                <Button
                  size="xs"
                  title="Delete"
                  color="gray"
                  className="font-medium rounded-md text-cyan-600 dark:text-cyan-500"
                >
                  Delete
                </Button>
                <Button
                  size="xs"
                  title="Approve"
                  color="gray"
                  className="font-medium rounded-md text-cyan-600 dark:text-cyan-500"
                >
                  Approve
                </Button>
              </Table.Cell>
            </Table.Row>
            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                Going to out of station
              </Table.Cell>
              <Table.Cell>Casual Leave</Table.Cell>
              <Table.Cell>05-06-2023</Table.Cell>
              <Table.Cell>08-06-2023</Table.Cell>
              <Table.Cell className="flex gap-2">
                <Button
                  size="xs"
                  title="Edit"
                  color="gray"
                  className="font-medium rounded-md decoration-none text-cyan-600 dark:text-cyan-500"
                  onClick={() => setIsOpen(true)}
                >
                  Edit
                </Button>
                <Button
                  size="xs"
                  title="Delete"
                  color="gray"
                  className="font-medium rounded-md text-cyan-600 dark:text-cyan-500"
                >
                  Delete
                </Button>
                <Button
                  size="xs"
                  title="Approve"
                  color="gray"
                  className="font-medium rounded-md text-cyan-600 dark:text-cyan-500"
                >
                  Approve
                </Button>
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </>
      <Modal show={isOpen} onClose={() => setIsOpen(false)} popup size="md">
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6">
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                Apply leave
              </h3>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="type" value="Select leave type" />
                </div>
                <div className="flex items-center gap-2">
                  <Radio
                    defaultChecked={values.leave === "Casual leave"}
                    id="casual_leave"
                    name="leave"
                    value="Casual Leave"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <Label htmlFor="casual_leave">Casual Leave</Label>
                  <Radio
                    defaultChecked={values.leave === "Sick leave"}
                    id="sick_leave"
                    name="leave"
                    value="Sick Leave"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <Label htmlFor="sick_leave">Sick Leave</Label>
                </div>
              </div>
              <div>
                <div className="mb-2 block">
                  <Label
                    htmlFor="from_date"
                    value="From Date"
                    color={errors.fromDate && touched.fromDate ? "failure" : ""}
                  />
                </div>
                <TextInput
                  id="from_date"
                  value={values.fromDate}
                  name="fromDate"
                  type="date"
                  color={errors.fromDate && touched.fromDate ? "failure" : ""}
                  helperText={
                    errors.fromDate && touched.fromDate ? errors.fromDate : ""
                  }
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label
                    htmlFor="to_date"
                    value="To Date"
                    color={errors.toDate && touched.toDate ? "failure" : ""}
                  />
                </div>
                <TextInput
                  id="to_date"
                  name="toDate"
                  value={values.toDate}
                  color={errors.toDate && touched.toDate ? "failure" : ""}
                  helperText={
                    errors.toDate && touched.toDate ? errors.toDate : ""
                  }
                  onChange={handleChange}
                  onBlur={handleBlur}
                  type="date"
                />
              </div>
              <div className="w-full">
                <Button
                  isProcessing={leaveLoading}
                  type="submit"
                  className="mb-3"
                >
                  Apply
                </Button>
              </div>
            </form>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Leave;
