import '../styles/globals.css'
import wrapper from '../components/redux/storeSetup';
import { Provider } from "react-redux";
import App, { Container } from "next/app";
import {createStore, applyMiddleware} from 'redux';
/*
function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default wrapper.withRedux(MyApp);
*/


/*
class MyApp extends App {
   static async getInitialProps({ Component, ctx }) {
       const pageProps = Component.getInitialProps
           ? await Component.getInitialProps(ctx)
           : {};
            return { pageProps };
   }

   render() {
      const { Component, pageProps } = this.props;
      return (
          <Component {...pageProps} />
      );
   }
}

export default wrapper.withRedux(MyApp);
*/

/*
class MyApp extends App {
  static getInitialProps = async ({Component, ctx}) => {
      return {
          pageProps: {
              // Call page-level getInitialProps
              ...(Component.getInitialProps ? await Component.getInitialProps(ctx) : {}),
              // Some custom thing for all pages
              //pathname: ctx.pathname,
          },
      };
  };

  render() {
      const {Component, pageProps} = this.props;
      return (
          <Component {...pageProps} />
      );
  }
}

export default wrapper.withRedux(MyApp);

*/

const MyApp = props => {
    const { Component, pageProps, store } = props;
    
    return (
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    );
  };
  
  MyApp.getInitialProps = async ({ Component, ctx }) => {
      ctx.store.dispatch({type: 'FETCH_BLOG_LIST'});
    const pageProps = Component.getInitialProps
      ? await Component.getInitialProps(ctx)
      : {};
    
    return { pageProps };
    };
  
 export default wrapper.withRedux(MyApp);
