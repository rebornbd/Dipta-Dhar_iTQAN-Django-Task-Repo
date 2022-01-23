import moment from 'moment';


export const productColumns = () => {
  return [
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Image',
      dataIndex: 'photo',
      render: (photo) =>
        <img 
          style={{ width: "120px", height: "100px", borderRadius: "4px" }} 
          src={`${photo}`} 
          alt={"product pic"} />,
    },
    {
      title: 'Description',
      dataIndex: 'short_desc',
      render: (short_desc) => String(short_desc).length <= 20 
        ? `${short_desc}`
        : `${String(short_desc).substring(0, 20)}...`,
    },
    {
      title: 'Category',
      dataIndex: 'category',
      render: category => `${category?.name}`,
    },
    {
      title: 'View Count',
      dataIndex: 'view_count',
      sorter: {
        compare: (a, b) => a.view_count - b.view_count,
        multiple: 1,
      },
    },
    {
      title: 'Created',
      dataIndex: 'created_at',
      key: 'created_at',
      render: (date) => `${moment(date).format('MMMM Do YYYY, h:mm:ss a')}`,
      sorter: (a, b) => moment(a.date).unix() - moment(b.date).unix()
    },
    {
      title: 'Updated',
      dataIndex: 'updated_at',
      render: (date) => `${moment(date).format('MMMM Do YYYY, h:mm:ss a')}`,
      sorter: (a, b) => moment(a.date).unix() - moment(b.date).unix()
    }
  ];
};
