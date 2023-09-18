export const createFetchResponse = (data: unknown) => ({
  ok: true,
  json: async () => data,
});
