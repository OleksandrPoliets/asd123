const users = new Map();

export const isExistUser = user => {
    const isExist = users.has(user);
    return isExist;
}

export const saveUser = (user, id) => {
    users.set(user, { id });
}

export const deleteUser = (user, id) => {
    const { id: socketId } = users.get(user);
    console.log(users)
    if (socketId === id) {
        users.delete(user);
    }
}



