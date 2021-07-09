import { Observable, of, Subject } from 'rxjs';
import { catchError } from 'rxjs/operators';

/**
 *  Fetch a item and store it in a dictionary.
 *
 * @param fetchObservable Observable to get the result.
 * @param map Dictionary where the result of the query will be saved.
 * @param id Id of the object.
 * @return  attribute.
 */
export const fetchWithCache = <T, TKey = any>(
  fetchObservable: Observable<T>,
  map: NonNullable<Map<TKey, Observable<T>>>,
  id: TKey): Observable<T> => {
  if (!id) {
    return of(null);
  }

  if (!map.has(id)) {
    const subject = new Subject<T>();
    map.set(id, subject.asObservable());

    fetchObservable
      .pipe(catchError(err => {
        map.delete(id);
        throw err;
      }))
      .subscribe(data => {
        map.set(id, of(data));
        subject.next(data);
        subject.complete();
      });
  }

  return map.get(id);
};
