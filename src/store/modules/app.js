const state = {
  isPageLoading: false,
};

const mutations = {
  setPageLoading: (state, isPageLoading) => {
    state.isPageLoading = isPageLoading;
  },
};

export default {
  namespaces: true,
  state,
  mutations,
};
