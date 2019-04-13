export default class CommonDataManager {

    static myInstance = null;

    username = "";
    sessionKey = "";

    /**
     * @returns {CommonDataManager}
     */
    static getInstance() {
        if (CommonDataManager.myInstance == null) {
            CommonDataManager.myInstance = new CommonDataManager();
        }

        return this.myInstance;
    }

    setSessionKey(key) {
        this.sessionKey = key;
    }

    getSessionKey() {
        return this.sessionKey;
    }

    getUsername() {
        return this.username;
    }

    setUsername(username) {
        this.username = username;
    }
}