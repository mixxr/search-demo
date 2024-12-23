// This component was generated by @sitecore-search/cli on Mon Aug 26 2024 13:33:05 GMT+0200 (Central European Summer Time)
import type { ChangeEvent, SyntheticEvent } from 'react';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import Spinner from '@/widgets/components/Spinner';
import SuggestionBlock from '@/widgets/components/SuggestionBlock';
import type { PreviewSearchInitialState } from '@sitecore-search/react';
import { WidgetDataType, usePreviewSearch, widget } from '@sitecore-search/react';
import { ArticleCard, Presence, PreviewSearch } from '@sitecore-search/ui';

type ArticleModel = {
  id: string;
  title: string;
  name: string;
  image_url: string;
  url: string;
  source_id?: string;
};

type InitialState = PreviewSearchInitialState<'itemsPerPage' | 'suggestionsList'>;

export const PreviewSearchComponent = ({ defaultItemsPerPage = 6 }) => {
  const navigate = useNavigate();
  const {
    widgetRef,
    actions: { onItemClick, onKeyphraseChange },
    queryResult,
    queryResult: {
      isFetching,
      isLoading,
      data: { suggestion: { title_context_aware: articleSuggestions = [] } = {} } = {},
    },
  } = usePreviewSearch<ArticleModel, InitialState>({
    state: {
      suggestionsList: [{ suggestion: 'title_context_aware', max: 6 }],
      itemsPerPage: defaultItemsPerPage,
    },
  });

  const loading = isLoading || isFetching;
  const keyphraseHandler = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const target = event.target;
      // const user: ContextUser = {
      //   'user_id': 'micser_001@example.com',
      //   'uuid': PageController.getContext().getUser().uuid
      // }
      // PageController.getContext().updateUser(user);
      onKeyphraseChange({ keyphrase: target.value });
    },
    [onKeyphraseChange],
  );
  const handleSubmit = (e: SyntheticEvent): void => {
    e.preventDefault();
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const target = e.target.query as HTMLInputElement;
    navigate(`/search?q=${target.value}`);
    target.value = '';
  };
  return (
    <PreviewSearch.Root>
      <form onSubmit={handleSubmit}>
        <PreviewSearch.Input
          name="query"
          className="w-[800px] rounded-sm box-border py-1 px-1 focus:outline-solid focus:outline-1 focus:outline-gray-200 dark:focus:outline-gray-900 dark:border-gray-900 border-1 bg-gray-100 dark:bg-gray-800 dark:text-gray-100"
          onChange={keyphraseHandler}
          autoComplete="off"
          placeholder="Type to search..."
        />
      </form>
      <PreviewSearch.Content
        ref={widgetRef}
        className="flex justify-center pt-0 h-[400px] shadow-[2px_5px_5px_5px_rgba(0,0,0,0.3)] transition-opacity	w-[var(--radix-popover-trigger-width)] bg-gray-100 dark:bg-gray-800"
      >
        <Spinner loading={loading} />

        <Presence present={!loading}>
          <>
            {articleSuggestions.length > 0 && (
              <PreviewSearch.Suggestions className="block box-border list-none w-[16rem] text-sm">
                <SuggestionBlock blockId={'title_context_aware'} items={articleSuggestions} title={'Suggestions'} />
              </PreviewSearch.Suggestions>
            )}
            <PreviewSearch.Results defaultQueryResult={queryResult}>
              {({ isFetching: loading, data: { content: articles = [] } = {} }) => (
                <PreviewSearch.Items
                  data-loading={loading}
                  className="flex flex-[3] bg-white dark:bg-gray-700 overflow-y-auto data-[loading=false]:grid data-[loading=false]:list-none data-[loading=false]:m-0 data-[loading=false]:p-2 data-[loading=false]:gap-3 data-[loading=false]:grid-cols-3"
                >
                  <Spinner loading={loading} />
                  {!loading &&
                    articles.map((article, index) => (
                      <PreviewSearch.Item key={article.id} asChild>
                        <PreviewSearch.ItemLink
                          href={article.url}
                          onClick={(e) => {
                            onItemClick({ id: article.id, index, sourceId: article.source_id });
                            navigate('/detail/' + article.id);
                          }}
                          className="flex box-border no-underline w-full text-black focus:shadow-md"
                        >
                          <ArticleCard.Root className="w-full shadow-[2px_2px_4px_rgba(0,0,0,0.3)] rounded-md p-2 cursor-pointer block border-transparent border-solid border text-center focus-within:shadow-[2px_2px_4px_rgba(0,0,0,0.8)] hover:shadow-[2px_2px_4px_rgba(0,0,0,0.8)] dark:text-white">
                            <div className="m-auto mb-[10px] relative h-[6em] flex justify-center items-center overflow-hidden">
                              <ArticleCard.Image
                                src={article.image_url}
                                className="block w-auto max-w-full h-auto max-h-full"
                              />
                            </div>
                            <ArticleCard.Title className="max-h-[2rem] overflow-hidden m-0 mb-2 text-xs">
                              {article.name}({article.title})
                            </ArticleCard.Title>
                          </ArticleCard.Root>
                        </PreviewSearch.ItemLink>
                      </PreviewSearch.Item>
                    ))}
                </PreviewSearch.Items>
              )}
            </PreviewSearch.Results>
          </>
        </Presence>
      </PreviewSearch.Content>
    </PreviewSearch.Root>
  );
};
const PreviewSearchWidget = widget(PreviewSearchComponent, WidgetDataType.PREVIEW_SEARCH, 'content');
export default PreviewSearchWidget;
