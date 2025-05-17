class AuthService {
  // User methods
  static setUserAuth(token, user) {
    this.clearAuth();
    localStorage.setItem('user_token', token);
    localStorage.setItem('user_data', JSON.stringify(user));
  }

  static getUserToken() {
    return localStorage.getItem('user_token');
  }

  static getUserData() {
    const user = localStorage.getItem('user_data');
    return user ? JSON.parse(user) : null;
  }

  static isUserAuthenticated() {
    return !!this.getUserToken();
  }

  // Captain methods
  static setCaptainAuth(token, captain) {
    this.clearAuth();
    localStorage.setItem('captain_token', token);
    localStorage.setItem('captain_data', JSON.stringify(captain));
  }

  static getCaptainToken() {
    return localStorage.getItem('captain_token');
  }

  static getCaptainData() {
    const captain = localStorage.getItem('captain_data');
    return captain ? JSON.parse(captain) : null;
  }

  static isCaptainAuthenticated() {
    return !!this.getCaptainToken();
  }

  // Common methods
  static clearAuth() {
    localStorage.removeItem('user_token');
    localStorage.removeItem('user_data');
    localStorage.removeItem('captain_token');
    localStorage.removeItem('captain_data');
  }

  static getCurrentRole() {
    if (this.isUserAuthenticated()) return 'user';
    if (this.isCaptainAuthenticated()) return 'captain';
    return null;
  }

  static getHomeRoute() {
    const role = this.getCurrentRole();
    return role === 'user' ? '/home' : 
           role === 'captain' ? '/captain-home' : '/login';
  }

  static getLoginRoute() {
    const role = this.getCurrentRole();
    return role === 'user' ? '/login' : 
           role === 'captain' ? '/captainlogin' : '/login';
  }
}

export default AuthService;