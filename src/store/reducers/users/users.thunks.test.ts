import { usersAPI } from "api";
import { beforeEach, expect, test, vitest, type Mocked } from "vitest";
import { actions, follow, unfollow } from "../users";
import { ApiResponseType } from "api/types";
import { ResultCodesEnum } from "api/enums";

vitest.mock("api/users-api");

const usersApiMock = usersAPI as Mocked<typeof usersAPI>;

const dispatchMock = vitest.fn();
const getStateMock = vitest.fn();

beforeEach(() => {
  dispatchMock.mockClear();
  getStateMock.mockClear();
  usersApiMock.follow.mockClear();
  usersApiMock.unfollow.mockClear();
});

const result: ApiResponseType = {
  resultCode: ResultCodesEnum.Success,
  messages: [],
  data: {},
};

usersApiMock.follow.mockReturnValue(Promise.resolve(result));
usersApiMock.unfollow.mockReturnValue(Promise.resolve(result));

test("success follow thunk", async () => {
  const thunk = follow(1);

  await thunk(dispatchMock, getStateMock, {});

  expect(dispatchMock).toBeCalledTimes(3);
  expect(dispatchMock).toHaveBeenNthCalledWith(
    1,
    actions.toggleFollowingProgress(true, 1)
  );
  expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.followSuccess(1));
  expect(dispatchMock).toHaveBeenNthCalledWith(
    3,
    actions.toggleFollowingProgress(false, 1)
  );
});

test("success unfollow thunk", async () => {
  const thunk = unfollow(1);

  await thunk(dispatchMock, getStateMock, {});

  expect(dispatchMock).toBeCalledTimes(3);
  expect(dispatchMock).toHaveBeenNthCalledWith(
    1,
    actions.toggleFollowingProgress(true, 1)
  );
  expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.unfollowSuccess(1));
  expect(dispatchMock).toHaveBeenNthCalledWith(
    3,
    actions.toggleFollowingProgress(false, 1)
  );
});
