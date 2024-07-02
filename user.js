let users = [
  {
    userid:'admin',
    userpw:'admin',
    username:'관리자'
  },
  {
    userid:'web1031',
    userpw:'1234',
    username:'쓱'
  },
  {
    userid:'test',
    userpw:'test',
    username:'테스트용'
  },
  {
    userid:'kimlight6',
    userpw:'0000',
    username:'김명준'
  },
];

function findUser(id, pw) {
  for (let i = 0; i < users.length; i++) {
    if (users[i].userid === id && users[i].userpw === pw) {
      return users[i];
    }
  }
  return false;
}

module.exports = {
  users,
  findUser
};
