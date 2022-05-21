export default class UserInfo {
  constructor ({name, job}) {
    this._name = name;
    this._job = job;
  }

  getUserInfo() {
    return {name: this._name.textContent, job: this._job.textContent};
  }

  setUserInfo(newName, newJob) {
    this._name.textContent = newName;
    this._job.textContent = newJob;
  }
}
