import React, { lazy, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AuthGuard from "../components/auth";

// const Layout = lazy(() => import('../components/layout'))
const LogIn = lazy(() => import("../pages/LogIn"));
const ChangePassword = lazy(() => import("../pages/ChangePassword"));
const ForgotPassword = lazy(() => import("../pages/ForgotPassword"));

const PageLayout = lazy(() => import("../pages/Layout"));

const Dashboard = lazy(() => import("../pages/Dashboard"));
const FunderManagement = lazy(() => import("../pages/FunderManagement"));
const NewFunderRequest = lazy(() => import("../pages/FunderManagement/NewFunderRequest"));
const BrokerManagement = lazy(() => import("../pages/BrokerManagement"));
const NewBrokerRequest = lazy(() => import("../pages/BrokerManagement/NewBrokerRequest"));
const BlockedBrokers = lazy(() => import("../pages/BlockedUserManagement/BlockedBrokers"));
const BlockedFunders = lazy(() => import("../pages/BlockedUserManagement/BlockedFunders"));
const FlaggedUsersManagement = lazy(() => import("../pages/FlaggedUserManagement"));
const ReportedUsersManagement = lazy(() => import("../pages/ReportedUsersManagement"));

const CompanyManagement = lazy(() => import("../pages/CompanyManagement"));
// const InterestsManagement = lazy(() => import('../pages/InterestsManagement'))

const ManagePrivacyPolicy = lazy(() => import("../pages/CMSManagement/ManagePrivacy"));
const ManageTerms = lazy(() => import("../pages/CMSManagement/ManageTerms"));
const ManageAmounts = lazy(() => import("../pages/AppDataManagement/ManageAmounts "));
const ManageIndustries = lazy(() => import("../pages/AppDataManagement/ManageIndustries"));
const ManageRates = lazy(() => import("../pages/AppDataManagement/ManageRates"));
const ManageStates = lazy(() => import("../pages/AppDataManagement/ManageStates"));
const ManageLoanTags = lazy(() => import("../pages/AppDataManagement/ManageLoanTags "));
const ManageTermLength = lazy(() => import("../pages/AppDataManagement/ManageTermLength"));
const ManageUpsell = lazy(() => import("../pages/AppDataManagement/ManageUpsell"));

// const AllPost = lazy(() => import('../pages/PostManagement'))
// const ReportedPost = lazy(() => import('../pages/PostManagement/ReportedPost'))
// const CommentPost = lazy(() => import('../pages/PostManagement/CommentPost'))

const AllPosts = lazy(() => import("../pages/PostManagement"));
const FunderPosts = lazy(() => import("../pages/PostManagement/FunderPosts"));
const BrokerPosts = lazy(() => import("../pages/PostManagement/BrokerPosts"));
const ReportedPosts = lazy(() => import("../pages/PostManagement/ReportedPosts"));
const CommentsPost = lazy(() => import("../pages/PostManagement/CommentsPost"));
const FlaggedPosts = lazy(() => import("../pages/PostManagement/FlaggedPost"));

const AllForums = lazy(() => import("../pages/ForumsManagement"));
const CommentForum = lazy(() => import("../pages/ForumsManagement/CommentForum"));
const ReportedForums = lazy(() => import("../pages/ForumsManagement/ReportedForums"));
const FlaggedForums = lazy(() => import("../pages/ForumsManagement/FlaggedForums"));

const AllArticles = lazy(() => import("../pages/ArticleManagement"));
const CommentArticle = lazy(() => import("../pages/ArticleManagement/CommentArticle"));
const ReportedArticles = lazy(() => import("../pages/ArticleManagement/ReportedArticles"));


const NotificationManagement = lazy(() => import("../pages/NotificationManagement"));

const AddNotification = lazy(() => import('../pages/NotificationManagement/AddNotification'));
const CategoryManagement = lazy(() => import("../pages/CategoryManagement"));
const LoanManagement = lazy(() => import("../pages/LoanManagement"));
const ReviewManagement = lazy(() => import("../pages/ReviewManagement"));
const Subscription = lazy(() => import("../pages/Subscription"));

const Routing = () => {
  const [container, setContainer] = useState(null);

  return (
    <Routes>
      <Route path="/login" element={<LogIn />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/change-password" element={<ChangePassword />} />
      <Route path="/" element={<AuthGuard><PageLayout setContainer={setContainer} container={container} /></AuthGuard>}>
        <Route path="/" element={<Navigate replace to="/dashboard" />} />

        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/funder-management" element={<FunderManagement />} />
        <Route path="/new-funder-requests" element={<NewFunderRequest />} />
        <Route path="/broker-management" element={<BrokerManagement />} />
        <Route path="/new-broker-requests" element={<NewBrokerRequest />} />
        <Route path="/blocked-management/blocked-brokers" element={<BlockedBrokers />} />
        <Route path="/blocked-management/blocked-funders" element={<BlockedFunders />} />
        <Route path="/flagged-users-management" element={<FlaggedUsersManagement />} />
        <Route path="/reported-users-management" element={<ReportedUsersManagement />} />

        <Route path="/company-management" element={<CompanyManagement />} />

        {/* <Route path="/interests-management" element={<InterestsManagement />} /> */}
        <Route path="/cms-management/privacy-policy" element={<ManagePrivacyPolicy />} />
        <Route path="/cms-management/terms-and-conditions" element={<ManageTerms />} />

        <Route path="/app-data-management/amount" element={<ManageAmounts />} />
        <Route path="/app-data-management/industries" element={<ManageIndustries />} />
        <Route path="/app-data-management/buy-rates" element={<ManageRates />} />
        <Route path="/app-data-management/states" element={<ManageStates />} />
        <Route path="/app-data-management/loan-tags" element={<ManageLoanTags />} />
        <Route path="/app-data-management/term-length" element={<ManageTermLength />} />
        <Route path="/app-data-management/upsell-points" element={<ManageUpsell />} />

        {/* <Route path="/post-management/all-post" element={<AllPost />} />
				<Route path="/post-management/all-post/:postId/post-comment" element={<CommentPost />} />
				<Route path="/post-management/reported-post" element={<AllPost />} /> */}

        <Route path="/post-management/all-posts" element={<AllPosts />} />
        <Route path="/post-management/all-posts/:postId/all-post-comments" element={<CommentsPost />} />

        <Route path="/post-management/funder-posts" element={<FunderPosts />} />
        <Route path="/post-management/all-posts/:postId/funder-post-comments" element={<CommentsPost />} />

        <Route path="/post-management/broker-posts" element={<BrokerPosts />} />
        <Route path="/post-management/all-posts/:postId/broker-post-comments" element={<CommentsPost />} />

        <Route path="/post-management/reported-posts" element={<ReportedPosts />} />
        <Route path="/post-management/all-posts/:postId/reported-post-comments" element={<CommentsPost />} />

        <Route path="/post-management/flagged-posts" element={<FlaggedPosts />} />
        <Route path="/post-management/all-posts/:postId/flagged-post-comments" element={<CommentsPost />} />

        <Route path="/forums-management/all-forums" element={<AllForums />} />
        <Route path="/forums-management/reported-forums" element={<ReportedForums />} />
        <Route path="/forums-management/all-forums/:forumId/forum-comments" element={<CommentForum />} />
        <Route path="/forums-management/flagged-forums" element={<FlaggedForums />} />

        <Route path="/articles-management/all-articles" element={<AllArticles />} />
        <Route path="/article-management/all-article/:articleId/article-comments" element={<CommentArticle />} />
        <Route path="/articles-management/reported-articles" element={<ReportedArticles />} />
        <Route path="/articles-management/all-articles" element={<AllArticles />} />
        <Route path="/articles-management/reported-articles" element={<ReportedArticles />} />

        <Route path="/notification-management" element={<NotificationManagement />} />

        <Route
          path="/notification-management/add-notification"
          element={<AddNotification />}
        />

        <Route
          path="/notification-management/edit-notification"
          element={<AddNotification />}
        />

        <Route path="/category-management" element={<CategoryManagement />} />
        <Route path="/loan-management" element={<LoanManagement />} />
        <Route path="/review-management" element={<ReviewManagement />} />
        <Route path="/subscription-management" element={<Subscription />} />
      </Route>
      <Route path="*" element={<Navigate replace to={"/"} />} />
    </Routes>
  );
};

export default Routing;
