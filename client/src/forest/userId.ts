function randomUserId(): string {
    return Math.random().toString(16).substr(2);
}

let myUserId: string | undefined;

export function getMyUserId() {
    if (myUserId) {
        return myUserId;
    } else {
        const localStorageUserId = window.localStorage.getItem("myUserId");
        myUserId = localStorageUserId || randomUserId();
        window.localStorage.setItem("myUserId", myUserId);
        return myUserId;
    }
}
