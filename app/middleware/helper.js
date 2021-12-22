function omtest()
{
    return "Hi Om";
}

function getotp()
{
    return Math.floor(1000 + Math.random() * 9000);
}

function getPagination(page, size) 
{
  const limit = size ? +size : 25;
  const offset = page ? page * limit : 0;

  return { limit, offset };
}

function getPagingData(data, page, limit) 
{
  const { count: totalItems, rows: result } = data;
  const currentPage = page ? +page : 0;
  const totalPages = Math.ceil(totalItems / limit);
  return { totalItems, totalPages, currentPage, result };
}


      
module.exports = {omtest, getotp, getPagination, getPagingData };